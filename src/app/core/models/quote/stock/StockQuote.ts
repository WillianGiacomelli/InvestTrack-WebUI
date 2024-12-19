export class StockQuote {
  stock!: string;
  name!: string;
  close!: number;
  change!: number;
  volume!: number;
  market_cap!: number | null;
  logo!: string;
  sector!: string;
  type!: string;
}
