import './App.css'
import FBTTable from './fbt/FBTTable'
import { Settings } from './fbt/Settings';
import { OpacityContext } from './fbt/VideoPlayer';
import { Questionnaire, type QuestionnaireResult } from './fbt/Questionnaire';
import React from 'react';
import { QuestionnaireSummary } from './fbt/QuestionnaireSummary';
import { FBTNav } from './fbt/FBTNav';

const opacityRef = { current: 0.9 };

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
                    <br />
                    <br />
                    <hr />
                    <FBTNav />
                </div>
                <div className="content">
                    <OpacityContext value={opacityRef}>
                        <FBTTable questionnaireResult={questionnaireResult} />
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
