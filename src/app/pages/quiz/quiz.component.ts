import { Explanation, Question, QUIZ } from '@/app/constants';
import { Component, computed, signal } from '@angular/core';

import { LafButton } from '@/app/components/laf-button';

@Component({
  selector: 'app-quiz',
  styleUrl: '../../styles/base-host.style.css',
  imports: [LafButton],
  templateUrl: './quiz.html',
})
export class Quiz {
  protected readonly quiz = QUIZ;
  protected readonly remainQuestions = signal<string[]>(Object.keys(QUIZ.questions));
  protected readonly currentQuestionId = signal<string | null>(null);
  protected readonly currentQuestion = signal<Question | null>(null);

  protected readonly explanationSignal = signal<Explanation | null>(null);
  protected readonly scores = signal<number>(0);
  protected readonly replied = signal<boolean>(false);
  protected readonly answer = signal<string | null>(null);

  public constructor() {}

  protected rank = computed(() => {
    const scores = this.scores();
    const ranks = this.quiz.ranks.filter((rank) => {
      if (rank.percens === false) {
        return rank.lessThan >= scores && rank.moreThan < scores;
      }

      const lessThan = rank.lessThan * this.quiz.scores.max;
      const moreThan = rank.moreThan * this.quiz.scores.max;

      return lessThan >= scores && moreThan < scores;
    });

    return ranks[0];
  });

  protected clearExplanation(explanation: Explanation) {
    if (typeof explanation === 'string') {
      return {
        text: explanation,
        href: null,
      };
    }

    return {
      text: explanation.lazy,
      href: explanation.detailedLink,
    };
  }

  protected handleOptionClick(option: string) {
    const question = this.currentQuestion();
    if (!question) {
      throw new Error('idk');
    }

    const score = question.answer === option ? 'correct' : 'wrong';
    const scores = this.scores() + question.scores[score];

    this.explanationSignal.set(question.explanation);
    this.scores.set(scores);
    this.replied.set(true);
    this.answer.set(option);
  }

  protected headerText = computed(() => {
    const questionId = this.currentQuestionId();
    if (!questionId) {
      return 'Добро пожаловать в квиз по LAF';
    }

    const question = this.quiz.questions[questionId];
    return question.question;
  });

  protected nextQuestion() {
    this.replied.set(false);
    this.answer.set(null);

    const questions = this.remainQuestions();
    const current = this.currentQuestionId();

    if (!current) {
      return this.setNewQuestions(questions);
    }

    return this.setNewQuestions(questions, current);
  }

  protected setNewQuestions(questions: string[], question?: string) {
    const newQuestions = this.shuffle(questions);
    const filteredNewQuestions = newQuestions.filter((newQuestion) => newQuestion !== question);

    const newCurrent = filteredNewQuestions[0];
    this.currentQuestionId.set(newCurrent);
    this.currentQuestion.set(this.quiz.questions[newCurrent]);
    this.remainQuestions.set(filteredNewQuestions);
  }

  protected shuffle<T>(array: T[]) {
    return array.sort(() => Math.random() - 0.5);
  }
}
