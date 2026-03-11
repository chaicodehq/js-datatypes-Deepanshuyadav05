/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
    // 1. Validation: Object and Name existence
    if (!student || typeof student !== 'object' || !student.name || typeof student.name !== 'string' || student.name.trim() === "") {
        return null;
    }

    // 2. Validation: Marks existence and non-empty
    if (!student.marks || typeof student.marks !== 'object' || Array.isArray(student.marks)) {
        return null;
    }

    const entries = Object.entries(student.marks);
    const subjectCount = entries.length;

    if (subjectCount === 0) {
        return null;
    }

    // 3. Validation: All marks must be valid numbers between 0 and 100
    for (const [subject, mark] of entries) {
        if (typeof mark !== 'number' || !Number.isFinite(mark) || mark < 0 || mark > 100) {
            return null;
        }
    }

    // 4. Calculations using Array Methods
    const marksValues = Object.values(student.marks);

    // totalMarks using reduce
    const totalMarks = marksValues.reduce((sum, current) => sum + current, 0);

    // percentage rounded to 2 decimal places
    const percentage = parseFloat(((totalMarks / (subjectCount * 100)) * 100).toFixed(2));

    // grade logic
    let grade;
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 40) grade = "D";
    else grade = "F";

    // Finding highest and lowest subjects
    // Sort entries by marks to find max and min easily
    const sortedEntries = [...entries].sort((a, b) => b[1] - a[1]);
    const highestSubject = sortedEntries[0][0];
    const lowestSubject = sortedEntries[sortedEntries.length - 1][0];

    // Passed and Failed subjects using filter
    const passedSubjects = entries
        .filter(([subject, mark]) => mark >= 40)
        .map(([subject, mark]) => subject);

    const failedSubjects = entries
        .filter(([subject, mark]) => mark < 40)
        .map(([subject, mark]) => subject);

    // 5. Final Report Card Object
    return {
        name: student.name,
        totalMarks,
        percentage,
        grade,
        highestSubject,
        lowestSubject,
        passedSubjects,
        failedSubjects,
        subjectCount
    };
}