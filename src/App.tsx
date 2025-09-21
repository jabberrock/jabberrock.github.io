import './App.css'
import FBTTable from './fbt/FBTTable'
import { SlimeVR } from './fbt/SlimeVR'
import { HTCVive30 } from './fbt/HTCVive30'
import { HTCViveUltimate } from './fbt/HTCViveUltimate';
import { Settings } from './fbt/Settings';
import { OpacityContext } from './fbt/VideoPlayer';
import { Questionnaire, type QuestionnaireResult } from './fbt/Questionnaire';
import React from 'react';

const opacityRef = { current: 0.8 };

function App() {
    const [questionnaireResult, setQuestionnaireResult] = React.useState<QuestionnaireResult | null>(null)

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
            {questionnaireResult ? (
                <OpacityContext value={opacityRef}>
                    <FBTTable initialChoices={choices} questionnaireResult={questionnaireResult} />
                    <Settings onOpacityChange={newOpacity => { opacityRef.current = newOpacity }} />
                </OpacityContext>
            ) : (
                <Questionnaire onComplete={setQuestionnaireResult} />
            )}
        </div>
    )
}

export default App
