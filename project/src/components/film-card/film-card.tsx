import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Film} from '../../types/film';
import VideoPlayer from '../video-player/video-player';


type Props = {
  film: Film,
  onMouseEnter: (id: string) => void,
}

function FilmCard(props: Props) {
  const {
    film,
    onMouseEnter
  } = props;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isNeedToPlay, setIsNeedToPlay] = useState(false);

  useEffect(() => {
    let needUpdate = true;

    if (isNeedToPlay) {
      setTimeout(() => needUpdate && setIsPlaying(true), 1000);
    }
    return () => {
      needUpdate = false;
    };
  }, [isNeedToPlay]);

  return (
    <article className="small-film-card catalog__films-card"
             onMouseEnter={() => {
               onMouseEnter(film.id);
               setIsNeedToPlay(true);
             }}
             onMouseLeave={() => {
               onMouseEnter('');
               setIsNeedToPlay(false);
               setIsPlaying(false);
             }}
    >
      <div className="small-film-card__image">
        <VideoPlayer film={film} width={280} height={175} isMuted={true} isPlaying={isPlaying}/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
