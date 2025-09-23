import type React from "react";
import type { QuestionnaireResult } from "./Questionnaire"

type QuestionnaireSummaryProps = {
    result?: QuestionnaireResult
    onReset: () => any
};

export const QuestionnaireSummary: React.FC<QuestionnaireSummaryProps> = ({
    result,
    onReset
}) => {
    if (result) {
        return (
            <>
                <div>Which VR headset do you own?</div>
                <div>{result.vrHeadset}</div>
                <br />
                <div>Will you use it standalone or PCVR?</div>
                <div>{result.standalone}</div>
                <br />
                <div>Do you own Lighthouse base stations?</div>
                <div>{result.ownsLighthouse ? "Yes" : "No"}</div>
                <br />
                <input type="button" value="Change Headset" onClick={e => {
                    e.preventDefault();
                    onReset();
                }}/>
            </>
        );
    } else {
        return (
            <>Questionnaire not complete</>
        );
    }
};
