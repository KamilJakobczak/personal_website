import { checkURL } from '../../utility/handlers/checkURL';
import List from '../lists/List';
import EditButton from '../general-purpose/EditButton';

interface AuthorProps {
  data: {
    id: string;
    firstName: string;
    secondName?: string;
    thirdName?: string;
    lastName: string;
    nationality?: string;
    birthYear?: number;
    bioPages?: {
      wiki: string;
      goodreads: string;
      lubimyczytac: string;
    };
    books: [];
  };
  editable: boolean;
}

const Author: React.FC<AuthorProps> = ({ data, editable }) => {
  const {
    id,
    firstName,
    secondName,
    thirdName,
    lastName,
    nationality,
    birthYear,
    books,
    bioPages,
  } = data;
  console.log(data);
  const editableData = {
    id,
    firstName,
    secondName,
    thirdName,
    lastName,
    nationality,
    birthYear,
    wiki: bioPages?.wiki,
    goodreads: bioPages?.goodreads,
    lubimyczytac: bioPages?.lubimyczytac,
  };

  return (
    <div className='author'>
      <div className='author__name'>
        <h4>
          {firstName} {secondName} {thirdName} {lastName}
          {editable ? <EditButton data={editableData} /> : null}
        </h4>
      </div>

      <div className='author__cover'>
        <div className='author__cover_img'>
          <img src='' alt='' />
        </div>
      </div>
      <div className='author__data'>
        <div className='author__data_nationality'>
          <p>Nationality</p>
          <span>-</span>
          <span>{nationality}</span>
        </div>
        <div className='author__data_birth_year'>
          <p>Year of birth</p>
          <span>-</span>
          <span>{birthYear}</span>
        </div>
        {bioPages ? (
          <div className='author__data_bioPages'>
            {bioPages.wiki ? (
              <a
                href={checkURL(bioPages.wiki)}
                rel='noreferrer noopener'
                target='_blank'
              >
                wikipedia
              </a>
            ) : null}
            {bioPages.goodreads ? (
              <a
                href={checkURL(bioPages.goodreads)}
                rel='noreferrer noopener'
                target='_blank'
              >
                goodreads
              </a>
            ) : null}
            {bioPages.lubimyczytac ? (
              <a
                href={checkURL(bioPages.lubimyczytac)}
                rel='noreferrer noopener'
                target='_blank'
              >
                lubimyczytac
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
      {books.length > 0 ? (
        <div className='author__books'>
          <h5>books</h5>
          <List data={books} nested={true} />
        </div>
      ) : null}
    </div>
  );
};

export default Author;
