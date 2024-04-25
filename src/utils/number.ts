import numbro from "numbro";

export const formatAmount = (num: number | undefined, digits = 3) => {
    if (num === 0) return "0";
    if (!num) return "-";
    if (num < 0.001) {
      return "<0.001";
    }
    if (num < 1000) {
      return numbro(num).format({
        average: true,
        mantissa: digits,
      }) + (num < 1 ? '' : 'K');
    }
    return numbro(num).format({
      average: true,
      mantissa: num > 1000 ? 2 : digits,
      abbreviations: {
        million: "M",
        billion: "B",
        thousand:"K"
      },
    });
};

  
export function formatNumber(number: number | null | undefined) {
    if (number === null || number === undefined) {
        return "0";
    } else if (typeof number !== 'number') {
        // If 'number' is not actually a number, return error message or handle it accordingly
        return "Invalid input";
    } else if (number < 1000) {
        const formattedNumber = number.toFixed(4);
        return formattedNumber.toString();
    } else if (number >= 1000 && number < 1000000) {
        const formattedNumber = (number / 1000).toFixed(1);
        return `${formattedNumber}K`;
    } else if (number >= 1000000 && number < 1000000000) {
        const formattedNumber = (number / 1000000).toFixed(1);
        return `${formattedNumber}M`;
    } else {
        const formattedNumber = (number / 1000000000).toFixed(1);
        return `${formattedNumber}B`;
    }
}