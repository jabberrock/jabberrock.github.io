import './App.css'
import FBTTable from './fbt/FBTTable'
import { Settings } from './fbt/Settings';
import { OpacityContext } from './shared/VideoPlayer';
import { VRSystemPicker } from './vr/VRSystemPicker';
import React from 'react';
import { VRSystemSummary } from './vr/VRSystemSummary';
import { FBTNav } from './fbt/FBTNav';
import type { VRSystem } from './vr/VR';

const opacityRef = { current: 0.9 };

function App() {
    const [questionnaireResult, setQuestionnaireResult] = React.useState<VRSystem | null>(null);
    
    // Load or make default questionnaire
    React.useEffect(() => {
        const savedResult = localStorage.getItem("vrSystem");
        if (savedResult) {
            setQuestionnaireResult(JSON.parse(savedResult))
        } else {
            setQuestionnaireResult({
                headset: "meta_quest_3",
                prefersPCVR: true,
                ownsLighthouse: false,
            });
        }
    }, []);

    if (questionnaireResult) {
        return (
            <div className="main">
                <div className="sidebar">
                    <VRSystemSummary
                        vrSystem={questionnaireResult}
                        onReset={() => setQuestionnaireResult(null)}
                    />
                    <br />
                    <br />
                    <hr />
                    <FBTNav />
                </div>
                <div className="content">
                    <OpacityContext value={opacityRef}>
                        <FBTTable vrSystem={questionnaireResult} />
                        <Settings onOpacityChange={newOpacity => { opacityRef.current = newOpacity }} />
                    </OpacityContext>
                </div>
            </div>
        );
    } else {
        return (
            <VRSystemPicker
                onComplete={vrSystem => {
                    localStorage.setItem("vrSystem", JSON.stringify(vrSystem));
                    setQuestionnaireResult(vrSystem);
                }}
            />
        );
    }
}

export default App
