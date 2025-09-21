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

    return (
        <div>
            {questionnaireResult ? (
                <OpacityContext value={opacityRef}>
                    <FBTTable systems={[
                        SlimeVR.specialized("6_trackers", questionnaireResult),
                        HTCVive30.specialized("3_trackers", questionnaireResult),
                        HTCViveUltimate.specialized("3_trackers", questionnaireResult),
                    ]} />
                    <Settings onOpacityChange={newOpacity => { opacityRef.current = newOpacity }} />
                </OpacityContext>
            ) : (
                <Questionnaire onComplete={setQuestionnaireResult} />
            )}
        </div>
    )
}

export default App
