// Name: Jonathan Strickland
// Date: 2025-01-19
// Description: An app to generate random passwords

// Using crypto makes the randomness unpredictable and safe for sensitive information
import { randomInt } from 'crypto';

// Function to display help message
// Run "node PasswordGen.js --help"
function displayHelp() {
    console.log(`Password Generator:
    
    Options:
    --help          Show this help message
    --length <n>    Specify the length of the password (default: 8)
    --uppercase     Include uppercase letters
    --numbers       Include numbers
    --symbols       Include special characters
    `);
}

// Function to generate a random password
function generatePassword(length, includeUppercase, includeNumbers, includeSymbols) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '~!@#$%^&*()_-+=[]{}|;:,.<>?';

    let characters = lowercase;

    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (!characters) {
        throw new Error('No character set selected for password generation.');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = randomInt(0, characters.length);
        password += characters[randomIndex];
    }

    return password;
}

// Handle and process command-line arguments
const args = process.argv.slice(2);
const options = {
    length: 8,
    includeUppercase: false,
    includeNumbers: false,
    includeSymbols: false,
};

for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case '--help':
            displayHelp();
            process.exit(0);
        case '--length':
            const length = parseInt(args[i + 1], 10);
            if (isNaN(length) || length <= 0) {
                console.error('Error: Invalid length specified. It must be a positive integer.');
                process.exit(1);
            }
            options.length = length;
            i++;
            break;
        case '--uppercase':
            options.includeUppercase = true;
            break;
        case '--numbers':
            options.includeNumbers = true;
            break;
        case '--symbols':
            options.includeSymbols = true;
            break;
        default:
            console.error(`Error: Unknown option '${args[i]}'. Use --help to see available options.`);
            process.exit(1);
    }
}

// Generate and display the password
try {
    const password = generatePassword(
        options.length,
        options.includeUppercase,
        options.includeNumbers,
        options.includeSymbols
    );
    console.log();
    console.log(`Generated Password: ${password}`);
    console.log();
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}