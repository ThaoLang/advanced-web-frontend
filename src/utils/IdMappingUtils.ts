// // IdMappingUtils.ts
// import * as crypto from 'crypto';

// export const mapStudentId = (prefix: string, accountId: string) => {
//     // Using SHA-256 hash function
//     const hashedId = crypto.createHash('sha256').update(accountId).digest('hex');
//     // Convert hexadecimal to decimal
//     const decimalRepresentation = parseInt(hashedId, 16);
//     // Extract a portion of the decimal value as the chain of numbers
//     const chainOfNumbers = decimalRepresentation % 10000;  // Adjust the range as needed

//     const zeroPad = (num: number, places: number) => String(num).padStart(places, '0');

//     // console.log(hashedId, decimalRepresentation, chainOfNumbers);
//     return prefix + "-" + zeroPad(chainOfNumbers, 4);
// }

// export const unmapStudentId = (mappedId: string): string | null => {

//     // Split the mappedId into prefix and numeric part
//     const parts = mappedId.split('-');

//     // Ensure that the mappedId has the expected format
//     if (parts.length !== 2) {
//         return null; // Invalid format
//     }

//     const [prefix, numericPart] = parts;

//     // Convert the numeric part back to decimal
//     const decimalRepresentation = parseInt(numericPart, 10);

//     // Convert decimal to hexadecimal
//     const reversedHexRepresentation = decimalRepresentation.toString(16);

//     console.log(decimalRepresentation, reversedHexRepresentation)
//     // Reverse the hash operation to obtain the original accountId
//     return reversedHexRepresentation;
// }