import fromJSONToHero from '../components/functions/fromJSONToHero.tsx'
import Button from '../components/button.tsx';

export default function CurrentPlayer() {
    let player: HeroInfo;
    let storedCurrentPlayer = localStorage.getItem('currentPlayer');

    if (storedCurrentPlayer) {
        player = fromJSONToHero(JSON.parse(storedCurrentPlayer));
    } else {
        localStorage.setItem('players', JSON.stringify(player));
    }

    return (
        <><div>
            <section id='characterInfo'>
                <div id='icon'>
                    <img src={`../../../Picture${player.getType()}.svg`}
                        alt="icon"
                    />
                </div>
                <div id='inventory'>
                    <div id='stats'>
                        <div>{player.getName()}</div>
                        <div>lv {player.getLevel()}  {player.getType()}</div>
                        <div>stats</div>
                    </div>
                    <div id='items'>
                        <div>items</div>
                    </div>
                </div>
            </section>
            <section>
                <Button variant='outlined' className='characterButton' herf={'/'} content={'go to Heroes'} onClick={() => { }} />
                <Button variant='outlined' className='characterButton' herf={'/'} content={'Delete'} onClick={() => { }} />
                <Button variant='outlined' className='characterButton' herf={'/'} content={'Next >'} onClick={() => { }} />
            </section>
        </div>
        </>
    );
}