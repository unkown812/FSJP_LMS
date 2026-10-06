import React from 'react';
import { Badge } from '../ui';
import { difficultyVariant } from './constants';
import { languageLabel } from './OneCompilerEditor';

/** Left-hand problem panel: statement, task, examples and constraints. */
export const ProblemStatement = ({ problem }) => {
  if (!problem) return null;

  return (
    <section className="card h-full">
      <div className="card-pad-lg space-y-7">
        <header className="space-y-3">
          <p className="eyebrow">Problem statement</p>
          <h2 className="text-display-lg text-ink">{problem.title}</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant={difficultyVariant(problem.difficulty)}>{problem.difficulty}</Badge>
            <Badge variant="outline">{languageLabel(problem.language)}</Badge>
            {problem.courseTitle && <Badge variant="mint">{problem.courseTitle}</Badge>}
          </div>
          <p className="text-body-md text-ink">{problem.description}</p>
        </header>

        {problem.tasks?.length > 0 && (
          <section aria-labelledby={`task-${problem.id}`}>
            <h3 id={`task-${problem.id}`} className="eyebrow">
              Task
            </h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-caption text-ink">
              {problem.tasks.map((task, index) => (
                <li key={`${problem.id}-task-${index}`}>{task}</li>
              ))}
            </ol>
          </section>
        )}

        {problem.examples?.length > 0 && (
          <section aria-labelledby={`examples-${problem.id}`}>
            <h3 id={`examples-${problem.id}`} className="eyebrow">
              Input / output examples
            </h3>
            <div className="mt-3 space-y-3">
              {problem.examples.map((example, index) => (
                <figure
                  key={`${problem.id}-example-${index}`}
                  className="rounded-sm border border-hairline"
                >
                  <figcaption className="eyebrow border-b border-hairline px-4 py-2.5">
                    Example {index + 1}
                  </figcaption>
                  <dl className="divide-y divide-hairline">
                    <div className="px-4 py-3">
                      <dt className="eyebrow">Input</dt>
                      <dd className="mt-1.5 whitespace-pre-wrap break-words font-mono text-caption text-ink">
                        {example.input}
                      </dd>
                    </div>
                    <div className="px-4 py-3">
                      <dt className="eyebrow">Output</dt>
                      <dd className="mt-1.5 whitespace-pre-wrap break-words font-mono text-caption text-ink">
                        {example.output}
                      </dd>
                    </div>
                    {example.explanation && (
                      <div className="px-4 py-3">
                        <dt className="eyebrow">Explanation</dt>
                        <dd className="mt-1.5 text-caption text-ink/70">{example.explanation}</dd>
                      </div>
                    )}
                  </dl>
                </figure>
              ))}
            </div>
          </section>
        )}

        {problem.constraints?.length > 0 && (
          <section aria-labelledby={`constraints-${problem.id}`}>
            <h3 id={`constraints-${problem.id}`} className="eyebrow">
              Constraints
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-caption text-ink">
              {problem.constraints.map((constraint, index) => (
                <li key={`${problem.id}-constraint-${index}`}>{constraint}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  );
};

export default ProblemStatement;
