import {Link} from 'react-router-dom';
import {Film} from '../../types/film';
import FilmsList from '../../components/films-list/films-list';
import {AppRoutes, Genres, SHOWN_FILMS_STEP} from '../../const';
import GenresList from "../../components/genre-list/genre-list";
import {useAppSelector} from '../../hooks';
import ShowMore from "../../components/show-more/show-more";
import {useState} from "react";
import HeaderUserInfo from "../../components/header-user-info/header-user-info";

export type Props = {
  promoFilm: Film
}

function MainPage(props: Props) {
  const {promoFilm} = props;
  const {films, activeGenre} = useAppSelector((state) => state);
  const [shownFilmsCount, setShownFilmsCount] = useState(SHOWN_FILMS_STEP);
  const filteredFilms = films
    .filter((film) => film.genre === activeGenre || activeGenre === Genres.ALL_GENRES)
    .slice(0, shownFilmsCount);
  const genres = Object.values(Genres);

  const showMoreClick = () => {
    setShownFilmsCount(shownFilmsCount + SHOWN_FILMS_STEP);
    console.log(shownFilmsCount);
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.posterImage} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a href={AppRoutes.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <HeaderUserInfo/>

        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={`${promoFilm.posterImage} poster`} width="218"
                   height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.releaseYear}</span>
              </p>

              <div className="film-card__buttons">

                <Link to={`/player/${promoFilm.id}`}>
                  <button className="btn btn--play film-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                </Link>

                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genres={genres} activeGenre={activeGenre}/>

          <FilmsList films={filteredFilms}/>

          {filteredFilms.length % SHOWN_FILMS_STEP === 0 && <ShowMore onClick={showMoreClick}/>}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href={'/'} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainPage;
