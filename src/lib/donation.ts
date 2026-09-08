/**
 * 헌금 계좌 — 홈 팝업(page.tsx)과 /donation 페이지가 함께 사용한다.
 * 예전에 두 파일에 같은 목록이 각각 하드코딩돼 있어, 계좌가 바뀌면
 * 한쪽만 고쳐지고 다른 쪽이 조용히 어긋날 위험이 있었다.
 */
export const DONATION_ACCOUNT_HOLDER = "수원하나교회";

export interface DonationAccount {
  label: string;
  bank: string;
  num: string;
}

export const DONATION_ACCOUNTS: DonationAccount[] = [
  { label: "십일조/감사", bank: "국민", num: "468001-01-318042" },
  { label: "선교헌금", bank: "국민", num: "422001-04-084939" },
  { label: "건축헌금", bank: "국민", num: "920301-01-563418" },
  { label: "DA", bank: "국민", num: "920301-01-563450" },
  { label: "난민사역후원", bank: "국민", num: "920301-01-512487" },
  { label: "구제헌금", bank: "국민", num: "920301-01-027154" },
];
