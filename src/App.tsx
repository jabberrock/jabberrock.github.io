import './App.css'
import FBTTable from './fbt/FBTTable'
import { SlimeVR } from './fbt/SlimeVR'
import { HTCVive30 } from './fbt/HTCVive30'
import { HTCViveUltimate } from './fbt/HTCViveUltimate';
import { Settings } from './fbt/Settings';
import { OpacityContext } from './fbt/VideoPlayer';
import { Questionnaire, type QuestionnaireResult } from './fbt/Questionnaire';
import React from 'react';
import { QuestionnaireSummary } from './fbt/QuestionnaireSummary';

const opacityRef = { current: 0.8 };

function App() {
    const [questionnaireResult, setQuestionnaireResult] = React.useState<QuestionnaireResult | null>(null);
    
    React.useEffect(() => {
        const savedResult = localStorage.getItem("questionnaire");
        if (savedResult) {
            setQuestionnaireResult(JSON.parse(savedResult))
        } else {
            setQuestionnaireResult({
                vrHeadset: "meta_quest_3",
                standalone: "pcvr",
                ownsLighthouse: false
            });
        }
    }, []);

    if (questionnaireResult) {
        return (
            <div className="main">
                <div className="sidebar">
                    <QuestionnaireSummary
                        result={questionnaireResult}
                        onReset={() => setQuestionnaireResult(null)}
                    />
                </div>
                <div className="content">
                    <OpacityContext value={opacityRef}>
                        <FBTTable systems={[
                            SlimeVR.specialized("6_trackers", questionnaireResult),
                            HTCVive30.specialized("3_trackers", questionnaireResult),
                            HTCViveUltimate.specialized("3_trackers", questionnaireResult),
                        ]} />
                        <Settings onOpacityChange={newOpacity => { opacityRef.current = newOpacity }} />
                    </OpacityContext>
                </div>
            </div>
        );
    } else {
        return (
            <Questionnaire onComplete={setQuestionnaireResult} />
        );
    }
}

export default App
