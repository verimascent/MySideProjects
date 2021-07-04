import React from 'react';
import {AnswerObject} from '../App';
import {Wrapper, ButtonWrapper} from './QuestionCard.styles';

type Props = {
    question: string;
    answer: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNo: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answer, 
    callback, 
    userAnswer, 
    questionNo, totalQuestions 
}) => (
    <Wrapper>
        <p className="number">
            Question: {questionNo} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answer.map(answer => (
                <ButtonWrapper key={answer} correct={userAnswer?.correctAnswer === answer} userClicked= {userAnswer?.answer === answer}>
                    <button disabled={!!userAnswer} value={answer} onClick={callback}><span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;