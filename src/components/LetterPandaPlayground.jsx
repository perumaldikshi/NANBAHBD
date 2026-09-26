import PandaMascot from './PandaMascot'
import './letterPandaPlayground.css'

export default function LetterPandaPlayground() {
  return <section className="letter-panda-playground" aria-label="Pandas celebrating the friendship letter">
    <div className="playground-heading"><span>🐾</span><div><small>Panda activity zone</small><strong>While the story continues...</strong></div><span>🐾</span></div>
    <div className="playground-stage">
      <div className="playground-ground" aria-hidden="true" />
      <div className="playground-bamboo" aria-hidden="true" />
      <div className="play-panda jumping-panda"><PandaMascot variant="letter-jump" label="Panda jumping happily" /><span>Jumping</span></div>
      <div className="play-panda playing-panda"><i className="panda-ball" aria-hidden="true" /><PandaMascot variant="letter-play" label="Panda playing with a ball" /><span>Playing</span></div>
      <div className="play-panda walking-panda"><PandaMascot variant="letter-walk" label="Panda walking" /><span>Walking</span></div>
      <div className="playground-leaves" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    </div>
  </section>
}
