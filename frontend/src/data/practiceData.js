/**
 * Practice problem data source.
 *
 * There is no backend practice API in CONTRACT.md (no GET /courses/{id}/problems
 * or similar endpoint exists), so the practice module ships with a small,
 * clearly isolated local dataset.
 *
 * Every screen must read problems through the async accessors below
 * (`fetchPracticeProblems` / `fetchPracticeProblem`) instead of importing
 * `PRACTICE_PROBLEMS` directly. When a backend practice API is agreed with the
 * Backend workstream, only this file changes: swap the local resolve for an
 * `apiClient` call with the same return shape. No page or component changes.
 *
 * Problem shape (stable contract for UI + future API):
 * {
 *   id: string,
 *   title: string,
 *   courseId: string | null,     // null => general (non-course) practice
 *   courseTitle: string | null,  // display-only association label
 *   difficulty: 'Easy' | 'Medium' | 'Hard',
 *   language: string,            // OneCompiler language slug (url segment)
 *   fileName: string,            // default file shown in the editor
 *   description: string,
 *   tasks: string[],
 *   examples: { input, output, explanation? }[],
 *   constraints: string[],
 *   starterCode: string,
 * }
 */

export const PRACTICE_PROBLEMS = [
  {
    id: 'practice-two-sum',
    title: 'Two Sum',
    courseId: null,
    courseTitle: null,
    difficulty: 'Easy',
    language: 'python',
    fileName: 'two_sum.py',
    description:
      'Given an array of integers and a target value, return the indices of the two numbers that add up to the target.',
    tasks: [
      'Read the list of integers and the target value.',
      'Find two distinct entries whose sum equals the target.',
      'Print both indices, separated by a space.',
    ],
    examples: [
      { input: '[2, 7, 11, 15], target = 9', output: '0 1', explanation: '2 + 7 = 9.' },
      { input: '[3, 2, 4], target = 6', output: '1 2' },
    ],
    constraints: ['Exactly one solution exists.', 'You may not use the same element twice.'],
    starterCode: `def two_sum(nums, target):
    seen = {}
    for index, value in enumerate(nums):
        complement = target - value
        if complement in seen:
            return [seen[complement], index]
        seen[value] = index
    return []


nums = [int(x) for x in input().split()]
target = int(input())
print(*two_sum(nums, target))
`,
  },
  {
    id: 'practice-fizzbuzz',
    title: 'FizzBuzz Counter',
    courseId: null,
    courseTitle: null,
    difficulty: 'Easy',
    language: 'javascript',
    fileName: 'fizzbuzz.js',
    description:
      'Print the numbers from 1 to n, replacing multiples of 3 with Fizz, multiples of 5 with Buzz and multiples of both with FizzBuzz.',
    tasks: [
      'Read the integer n from standard input.',
      'Loop from 1 to n inclusive.',
      'Print the FizzBuzz value for each number on its own line.',
    ],
    examples: [
      { input: '5', output: '1\n2\nFizz\n4\nBuzz' },
      { input: '15', output: '... Buzz\nFizzBuzz' },
    ],
    constraints: ['1 <= n <= 10000'],
    starterCode: `const n = parseInt(prompt() || '15', 10);

for (let i = 1; i <= n; i++) {
  if (i % 15 === 0) console.log('FizzBuzz');
  else if (i % 3 === 0) console.log('Fizz');
  else if (i % 5 === 0) console.log('Buzz');
  else console.log(i);
}
`,
  },
  {
    id: 'practice-valid-parentheses',
    title: 'Valid Parentheses',
    courseId: null,
    courseTitle: null,
    difficulty: 'Medium',
    language: 'python',
    fileName: 'valid_parentheses.py',
    description:
      'Given a string containing just the characters ()[]{}, determine whether the input string has balanced brackets.',
    tasks: [
      'Read the bracket string.',
      'Use a stack to match every closing bracket with its opening bracket.',
      'Print true when the string is valid, otherwise print false.',
    ],
    examples: [
      { input: '()[]{}', output: 'true' },
      { input: '([)]', output: 'false', explanation: 'Brackets are closed out of order.' },
    ],
    constraints: ['1 <= length <= 10000'],
    starterCode: `def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)
    return not stack


print(str(is_valid(input().strip())).lower())
`,
  },
  {
    id: 'practice-rest-get-endpoint',
    title: 'Expose a Course Lookup Endpoint',
    courseId: '1',
    courseTitle: 'Full-Stack Java with Spring Boot & React',
    difficulty: 'Medium',
    language: 'java',
    fileName: 'CourseLookup.java',
    description:
      'Implement a method that finds a course by id from an in-memory list and returns a formatted result, the same way a Spring @GetMapping handler would.',
    tasks: [
      'Read the course id from standard input.',
      'Search the sample course list for a matching id.',
      'Print "FOUND: <title>" when found, otherwise print "NOT FOUND".',
    ],
    examples: [
      { input: '1', output: 'FOUND: Full-Stack Java with Spring Boot & React' },
      { input: '99', output: 'NOT FOUND' },
    ],
    constraints: ['Ids are positive integers.', 'The list contains at most 100 courses.'],
    starterCode: `import java.util.*;

public class CourseLookup {
    record Course(long id, String title) {}

    static List<Course> courses = List.of(
        new Course(1, "Full-Stack Java with Spring Boot & React"),
        new Course(2, "Data Structures and Algorithms in Java")
    );

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long id = Long.parseLong(scanner.nextLine().trim());

        Optional<Course> found = courses.stream()
            .filter(course -> course.id() == id)
            .findFirst();

        System.out.println(found
            .map(course -> "FOUND: " + course.title())
            .orElse("NOT FOUND"));
    }
}
`,
  },
  {
    id: 'practice-debounce',
    title: 'Implement a Debounce Function',
    courseId: '1',
    courseTitle: 'Full-Stack Java with Spring Boot & React',
    difficulty: 'Medium',
    language: 'javascript',
    fileName: 'debounce.js',
    description:
      'Write a debounce helper that delays invoking a function until after wait milliseconds have elapsed since the last call — the pattern behind search-as-you-type inputs.',
    tasks: [
      'Implement debounce(fn, wait) returning a wrapped function.',
      'Only call fn once the caller has stopped invoking the wrapper for wait ms.',
      'Call the wrapped function three times quickly and print the result.',
    ],
    examples: [
      {
        input: 'calls at 0ms, 50ms, 100ms with wait = 100ms',
        output: 'runs once after 200ms',
        explanation: 'Each new call resets the timer.',
      },
    ],
    constraints: ['wait is a non-negative integer in milliseconds.'],
    starterCode: `function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

let runs = 0;
const log = debounce(() => {
  runs += 1;
  console.log('executed', runs);
}, 100);

log();
log();
log();
`,
  },
  {
    id: 'practice-binary-search',
    title: 'Binary Search',
    courseId: '2',
    courseTitle: 'Data Structures and Algorithms in Java',
    difficulty: 'Medium',
    language: 'java',
    fileName: 'BinarySearch.java',
    description:
      'Given a sorted array of integers and a target value, return the index of the target using binary search, or -1 when it is absent.',
    tasks: [
      'Read the sorted array and the target value.',
      'Repeatedly narrow the search range by comparing against the middle element.',
      'Print the found index or -1.',
    ],
    examples: [
      { input: '[1, 3, 5, 7, 9], target = 7', output: '3' },
      { input: '[1, 3, 5, 7, 9], target = 4', output: '-1' },
    ],
    constraints: ['Array is sorted in ascending order.', 'O(log n) expected time complexity.'],
    starterCode: `import java.util.*;

public class BinarySearch {
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] nums = Arrays.stream(scanner.nextLine().trim().split("\\\\s+"))
            .mapToInt(Integer::parseInt)
            .toArray();
        int target = Integer.parseInt(scanner.nextLine().trim());
        System.out.println(search(nums, target));
    }
}
`,
  },
  {
    id: 'practice-merge-intervals',
    title: 'Merge Overlapping Intervals',
    courseId: '2',
    courseTitle: 'Data Structures and Algorithms in Java',
    difficulty: 'Hard',
    language: 'java',
    fileName: 'MergeIntervals.java',
    description:
      'Given a list of start/end intervals, merge every group of overlapping intervals and print the resulting non-overlapping list.',
    tasks: [
      'Read the number of intervals and each start/end pair.',
      'Sort intervals by their start value.',
      'Merge overlapping intervals and print them in ascending order.',
    ],
    examples: [
      { input: '4\n1 3\n2 6\n8 10\n15 18', output: '1 6\n8 10\n15 18' },
      { input: '2\n1 4\n4 5', output: '1 5' },
    ],
    constraints: ['0 <= start <= end <= 10^9', 'At most 10^5 intervals.'],
    starterCode: `import java.util.*;

public class MergeIntervals {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int count = Integer.parseInt(scanner.nextLine().trim());
        int[][] intervals = new int[count][2];
        for (int i = 0; i < count; i++) {
            String[] parts = scanner.nextLine().trim().split("\\\\s+");
            intervals[i][0] = Integer.parseInt(parts[0]);
            intervals[i][1] = Integer.parseInt(parts[1]);
        }

        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
        List<int[]> merged = new ArrayList<>();
        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.get(merged.size() - 1)[1] =
                    Math.max(merged.get(merged.size() - 1)[1], interval[1]);
            }
        }

        for (int[] interval : merged) {
            System.out.println(interval[0] + " " + interval[1]);
        }
    }
}
`,
  },
];

const matchesCourse = (problem, courseId) =>
  courseId === undefined || courseId === null
    ? true
    : String(problem.courseId) === String(courseId);

/** Synchronous read of the local dataset (filterable by course). */
export const getPracticeProblems = ({ courseId } = {}) =>
  PRACTICE_PROBLEMS.filter((problem) => matchesCourse(problem, courseId));

/** Asynchronous read — the single entry point every page uses. */
export const fetchPracticeProblems = ({ courseId } = {}) =>
  new Promise((resolve, reject) => {
    try {
      // Local mock boundary. Replace with:
      //   const response = await apiClient.get(`/api/v1/...`);
      // once a practice endpoint exists in the backend contract.
      setTimeout(() => resolve(getPracticeProblems({ courseId })), 0);
    } catch (error) {
      reject(error);
    }
  });

/** Asynchronous single-problem lookup used by the practice workspace. */
export const fetchPracticeProblem = ({ courseId, problemId } = {}) =>
  fetchPracticeProblems({ courseId }).then(
    (problems) => problems.find((problem) => problem.id === problemId) || null
  );

export default PRACTICE_PROBLEMS;
