import { useMutation } from '@apollo/client';
import Button from '../general-purpose/Button';
import { useState } from 'react';
import { ADD_USERBOOKDETAILS } from '../../../../../GraphQL/mutations';
import PurchasedBookDetails from './PurchasedBookDetails';
import { CoverTypes, BookStatus, CoverCheckboxes } from '../../types';

interface UserActionsInterface {
  parentClass: string;
  recordId: string;
}

const UserActions: React.FC<UserActionsInterface> = ({ parentClass, recordId }) => {
  // initial state
  const initialPurchasedBooksState = [
    {
      id: 0,
      type: CoverTypes.PAPERBACK,
      checked: false,
      buyPrice: '',
      edition: { editionNumber: '', editionYear: '' },
    },
    {
      id: 1,
      type: CoverTypes.HARDCOVER,
      checked: false,
      buyPrice: '',
      edition: { editionNumber: '', editionYear: '' },
    },
    {
      id: 2,
      type: CoverTypes.EBOOK,
      checked: false,
      buyPrice: '',
      edition: { editionNumber: '', editionYear: '' },
    },
  ];
  // status states
  const [bookStatus, setBookStatus] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  // value states
  const [owned, setOwned] = useState<boolean>();
  const [whenRead, setWhenRead] = useState('');
  const [ratingState, setRatingState] = useState('');

  const [purchasedBooksInfo, setPurchasedBooksInfo] = useState<CoverCheckboxes[]>(initialPurchasedBooksState);
  // fetch/send data
  const [addUserBookDetails, { data, loading, error }] = useMutation(ADD_USERBOOKDETAILS, {
    onCompleted(data) {},
  });
  // handlers

  const updatePurchasedBooksState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasedBooksInfo(prevState => {
      const newState = prevState.map(book => {
        if (book.type === e.target.id) {
          return { ...book, checked: !book.checked };
        }
        return book;
      });
      return newState;
    });
  };

  // const handleRating = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
  //   setRating(e.currentTarget.value);
  // };
  const handleBookStatus = (status: string) => {
    setRatingState('');
    setWhenRead('');
    setBookStatus(status);
  };
  const handleRating = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const rating = e.currentTarget.id.slice(5);
    setRatingState(rating);
  };

  const handleOwnedCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ownedBox = document.getElementById('owned') as HTMLInputElement;
    const notOwnedBox = document.getElementById('notOwned') as HTMLInputElement;

    if (ownedBox && notOwnedBox) {
      if (e.target.id === 'owned') {
        if (notOwnedBox.checked === false) {
          setOwned(true);
        } else if (notOwnedBox.checked === true) {
          notOwnedBox.checked = false;
          setOwned(true);
        }
      } else if (e.target.id === 'notOwned') {
        if (ownedBox.checked === false) {
          setOwned(false);
        } else if (ownedBox.checked === true) {
          ownedBox.checked = false;
          setOwned(false);
        }
      }
    }
  };

  const handleSubmit = () => {
    const purchasedBooksInfoInput = purchasedBooksInfo.map(book => {
      if (book.checked === true) {
        return {
          coverType: book.type,
          buyPrice: parseInt(book.buyPrice),
          currency: book.currency,

          edition: {
            editionNumber: parseInt(book.edition.editionNumber),
            editionYear: parseInt(book.edition.editionYear),
          },
        };
      } else
        return {
          coverType: book.type,
        };
    });

    addUserBookDetails({
      variables: {
        bookId: recordId,
        status: bookStatus,
        whenRead: whenRead !== '' ? whenRead : null,
        rating: ratingState !== '' ? parseInt(ratingState) : null,
        purchasedBookInfo: purchasedBooksInfoInput,
      },
    });
  };
  // elements
  const showRating = () => {
    const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return ratings.map(rating => {
      const classVariant = rating <= parseInt(ratingState) ? 'solid' : `regular`;
      return (
        <i
          onClick={e => handleRating(e)}
          key={`rating-${rating}`}
          id={`star-${rating}`}
          className={`fa-sharp fa-${classVariant} fa-star`}
        ></i>
      );
    });
  };

  const purchasedBooksOptions = () => {
    return purchasedBooksInfo.map(cover => {
      if (cover.checked === true) {
        return <PurchasedBookDetails cover={cover} key={cover.type} updateState={setPurchasedBooksInfo} />;
      } else return null;
    });
  };

  const optionsForm = () => {
    return (
      <div className={`${parentClass}__userActions__options userActions`}>
        <form className={`${parentClass}__userActions__options_form userActions__form`}>
          <div className='userActionsForm_element userActions__form_element-status'>
            <label htmlFor='bookStatus'>Status:</label>
            <select name='bookStatus' id='bookStatus' onChange={e => handleBookStatus(e.target.value)}>
              <option value=''>-- select --</option>
              <option value={BookStatus.READ}>{BookStatus.READ}</option>
              <option value={BookStatus.UNREAD}>{BookStatus.UNREAD}</option>
              <option value={BookStatus.WANTEDTOBUY}>{BookStatus.WANTEDTOBUY}</option>
              <option value={BookStatus.WANTEDTOREAD}>{BookStatus.WANTEDTOREAD}</option>
            </select>
          </div>
          {bookStatus === BookStatus.READ && (
            <>
              <div className='userActionsForm_element userActions__form_element-rating'>
                <legend>Rating:</legend>
                <div>{showRating()}</div>
              </div>
              <div className='userActionsForm_element userActions__form_element-whenRead'>
                <label htmlFor='whenRead'>Read in:</label>
                <input
                  id='whenRead'
                  type='number'
                  min={1950}
                  max={2050}
                  value={whenRead}
                  onChange={e => setWhenRead(e.target.value)}
                />
              </div>
            </>
          )}
          <div className='userActionsForm_element userActions__form_element-owned '>
            <legend>Owned:</legend>
            <div className='form-control'>
              <label htmlFor='owned'>owned</label>
              <input type='checkbox' name='owned' id='owned' onChange={e => handleOwnedCheckboxes(e)} />
            </div>
            <div className='form-control'>
              <label htmlFor='notOwned'>not owned</label>
              <input type='checkbox' name='notOwned' id='notOwned' onChange={e => handleOwnedCheckboxes(e)} />
            </div>
          </div>
          {owned && (
            <>
              <div className='userActionsForm_element userActions__form_element-coverType'>
                <label htmlFor='coverType'>Cover:</label>
                <div>
                  <label htmlFor={CoverTypes.PAPERBACK}>paperback</label>
                  <input
                    type='checkbox'
                    name='coverType'
                    id={CoverTypes.PAPERBACK}
                    onChange={e => updatePurchasedBooksState(e)}
                  />
                </div>
                <div>
                  <label htmlFor={CoverTypes.HARDCOVER}>hardcover</label>
                  <input
                    type='checkbox'
                    name='coverType'
                    id={CoverTypes.HARDCOVER}
                    onChange={e => updatePurchasedBooksState(e)}
                  />
                </div>
                <div>
                  <label htmlFor={CoverTypes.EBOOK}>ebook</label>
                  <input
                    type='checkbox'
                    name='coverType'
                    id={CoverTypes.EBOOK}
                    onChange={e => updatePurchasedBooksState(e)}
                  />
                </div>
              </div>
              {purchasedBooksOptions()}
            </>
          )}
          <Button
            className={`${parentClass}__userActions__submit userActions__form_element-submit`}
            text='add to library'
            handleClick={handleSubmit}
          />
        </form>
      </div>
    );
  };

  return (
    <div className={`${parentClass}__userActions`}>
      {!showOptions && (
        <Button
          className={`${parentClass}__userActions_showDetails`}
          text='add book to your library'
          handleClick={() => setShowOptions(true)}
        />
      )}
      {showOptions && optionsForm()}
    </div>
  );
};

export default UserActions;
