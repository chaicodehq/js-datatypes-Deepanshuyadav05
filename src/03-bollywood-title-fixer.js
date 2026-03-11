/**
 * 🎬 Bollywood Movie Title Fixer
 *
 * Pappu ne ek movie database banaya hai lekin usne saare titles galat type
 * kar diye - kuch ALL CAPS mein, kuch all lowercase mein, kuch mein extra
 * spaces hain. Tu fix kar de titles ko proper Title Case mein!
 *
 * Rules:
 *   - Extra spaces hatao: leading, trailing, aur beech ke multiple spaces ko
 *     single space banao
 *   - Har word ka pehla letter uppercase, baaki lowercase (Title Case)
 *   - EXCEPTION: Chhote words jo Title Case mein lowercase rehte hain:
 *     "ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"
 *     LEKIN agar word title ka PEHLA word hai toh capitalize karo
 *   - Hint: Use trim(), split(), map(), join(), charAt(), toUpperCase(),
 *     toLowerCase(), slice()
 *
 * Validation:
 *   - Agar input string nahi hai, return ""
 *   - Agar string trim karne ke baad empty hai, return ""
 *
 * @param {string} title - Messy Bollywood movie title
 * @returns {string} Cleaned up Title Case title
 *
 * @example
 *   fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  ")
 *   // => "Dilwale Dulhania Le Jayenge"
 *
 *   fixBollywoodTitle("dil ka kya kare")
 *   // => "Dil ka Kya Kare"
 */
export function fixBollywoodTitle(title) {
    // 1. Validation: Must be a string
    if (typeof title !== 'string') {
        return "";
    }

    // 2. Clean extra spaces: Trim ends and replace multiple middle spaces with one
    // regex /\s+/ matches any whitespace (space, tab, etc.)
    const cleanTitle = title.trim().replace(/\s+/g, ' ');

    if (cleanTitle === "") {
        return "";
    }

    // 3. Define the lowercase exceptions
    const exceptions = ["ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"];

    // 4. Split into words and transform
    const words = cleanTitle.split(" ");

    const fixedWords = words.map((word, index) => {
        const lowerWord = word.toLowerCase();

        // Rule: Capitalize if it's the FIRST word OR if it's NOT in the exception list
        if (index === 0 || !exceptions.includes(lowerWord)) {
            return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
        } else {
            // Keep it lowercase if it's an exception (and not the first word)
            return lowerWord;
        }
    });

    // 5. Join back together
    return fixedWords.join(" ");
}