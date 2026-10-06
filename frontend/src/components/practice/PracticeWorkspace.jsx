import React from 'react';
import ProblemStatement from './ProblemStatement';
import OneCompilerEditor, { languageLabel } from './OneCompilerEditor';

/**
 * Two-part practice workspace: problem statement beside the OneCompiler
 * editor. Stacks vertically below the lg breakpoint.
 */
export const PracticeWorkspace = ({ problem, editorHeight = 450 }) => {
  if (!problem) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-5">
        <ProblemStatement problem={problem} />
      </div>

      <div className="min-w-0 lg:col-span-7">
        <OneCompilerEditor
          language={problem.language}
          starterCode={problem.starterCode}
          fileName={problem.fileName}
          height={editorHeight}
          title={`${problem.title} — ${languageLabel(problem.language)} editor`}
        />
        <p className="mt-3 text-caption text-body">
          Editing and execution are powered by OneCompiler. Load the starter
          code, work through the task, then run your solution.
        </p>
      </div>
    </div>
  );
};

export default PracticeWorkspace;
