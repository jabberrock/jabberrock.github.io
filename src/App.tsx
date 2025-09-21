import './App.css'
import FBTTable from './fbt/FBTTable'
import { SlimeVR } from './fbt/SlimeVR'
import { HTCVive30 } from './fbt/HTCVive30'
import { HTCViveUltimate } from './fbt/HTCViveUltimate';
import { Settings } from './fbt/Settings';
import { OpacityContext } from './fbt/VideoPlayer';

const opacityRef = { current: 0.8 };

function App() {
    const choices = [
        {
            system: SlimeVR,
            config: "6_trackers"
        },
        {
            system: HTCVive30,
            config: "3_trackers"
        },
        {
            system: HTCViveUltimate,
            config: "3_trackers"
        },
    ];

    return (
        <div>
            <OpacityContext value={opacityRef}>
                <FBTTable initialChoices={choices} />
                <Settings onOpacityChange={newOpacity => { opacityRef.current = newOpacity }} />
            </OpacityContext>
        </div>
    )
}

export default App
