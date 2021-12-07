export const AddressZero = "0x0000000000000000000000000000000000000000";

export const BLOCKS_PER_YEAR = {
  1: 2102400,
  4: 2102400,
  42: 2102400,
  137: 15768000,
  80001: 15768000,
};

// due to block range restriction on polygon rpc
export const EVENT_START_BLOCK = {
  1: 0,
  4: 0,
  42: 0,
  137: 16642085,
  80001: 15129900,
};

// due to block range restriction on polygon rpc
export const EVENT_BLOCK_INTERVAL = {
  1: 100000,
  42: 100000,
  137: 100000,
  80001: 10000000,
};

export const ASSET_AND_ADAPTER_PROXY_ADMIN_ADDRESS = {
  1: AddressZero,
  4: AddressZero,
  42: "0x672760099f9752631655dbc6fdf2b88f4890378b",
  137: "0x0a39C91d4DCd11dd2FaEe8A18Dd1e8079359f64b",
  80001: "0x25A4181c335ed6B370a0De1F3583830C1C7Cf80D",
};

export const ASSET_MANAGER_ADDRESSES = {
  1: AddressZero,
  4: "0xd0493c674156566f363ff3B6980c1E64742EEde8",
  42: "0x3Adb59d05fB33fa64885106941faF93B15e72a8d",
  137: "0x64ADBC200cE099B2B029FDF59a5E86Facb751911",
  80001: "0x7ebdbE9E8636dedbB5EfC62111b672484Fe8B385",
};

export const MARKET_REGISTRY_ADDRESSES = {
  1: AddressZero,
  4: "0xf7D7d933e10947Ea17d8439795a5acbCC34afd0e",
  42: "0xfeA8313054DDCAD99942C912F86aB706fAAf460d",
  137: "0x8090733bBE6004B54c92284142568A32df56d97A",
  80001: "0x7141B571b5100533Bc3a73dB9160Af743e5802fe",
};

export const USER_MANAGER_ADDRESSES = {
  1: AddressZero,
  4: "0x601d3E70F74744913Ad10Abb81F8118D78B9F901",
  42: "0xcc4dC247104E939ed22B36651EB36bE01F156AE5",
  137: "0xd99ccdb6E05937e53EFDb099eeAe33D559b20F90",
  80001: "0x3635d6F0fE995B2C7aC1A8EF681478f2Dc0dD844",
};

export const UNION_TOKEN_ADDRESSES = {
  1: AddressZero,
  4: "0xc16C4B33538261a80fcd2eE74EBD26fd7f4d2D89",
  42: "0x98A077181377184E120832C24698d858DBb8880e",
  137: "0x7c009F092395C35BDD87C74D2a907B0E3115026a",
  80001: "0xB24cEE3786114bcFBc71E48d574a58E2367bEBFf",
};

export const COMPTROLLER_ADDRESSES = {
  1: AddressZero,
  4: "0x62Eb8d3Df9F63ef580392a8536036C8F3A9BF319",
  42: "0xEAa89ec2eD24268EA7A332ABF35933D3449Ee8b0",
  137: "0x749D7D8bc289805aED3e5B55A7A38292596DE389",
  80001: "0x10D58077807a010CC179CA6cf936d03F6c6a197f",
};

export const U_TOKEN_ADDRESSES = {
  1: AddressZero,
  4: "0x286dc33F2fE0D3C4368cc00b2643945249F6555A",
  42: "0xEa2A38164C9a37f73aB7b03FB1aA24497f6F9d64",
  137: "0xA0e739fF8E0F56346EDc0eb99Bb1478173Ee73ad",
  80001: "0x80987e8f1E0EDBb241482b69B0aD445B8872152e",
};

export const TREASURY_VESTOR_ADDRESSES = {
  1: AddressZero,
  4: "0x66C04Be14F68F0307DA9BF1441e2BFFF5d3CB52A",
  42: "0x6f32DD95ef8986d5b06D8248569380D1d8f4D115",
  137: "0x7f9BA3c7F0DE073cb2B9D394F913E0c114B0cF02",
  80001: AddressZero,
};

export const RESERVOIR_1_ADDRESSES = {
  1: AddressZero,
  4: "0x1c149E5e1169156115c46B0A4766546137Df22D2",
  42: "0x0D5C0e593FC9CF1c5bB88E3C556F33a86009C510",
  137: "0x70967Acb0b0474747C34905588CD2f56572Cc618",
  80001: AddressZero,
};

export const RESERVOIR_2_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  42: "0x421e4F40977F724Ca15d1dD1a3F9f893dB4883De",
  137: AddressZero,
  80001: AddressZero,
};

export const GOVERNOR_ADDRESSES = {
  1: AddressZero,
  4: "0x51658ff9283BdFAFF845F99Fe693a1Dc0bDF44a7",
  42: "0xf6C3166b89399BC9AE103Ca43faa843e4D2F992F",
  137: "0x7e376e9eccD105CA47f2d7EdE8e106A6F72F4C9B",
  // 80001: "0xcFc4Ce89564C6498F006Ec40533919EC806358aB", // alpha
  80001: "0x02fc8f9dd8cfc9af89a2d772b7e5daaa291be1cc", // bravo
};

export const TIMELOCK_ADDRESSES = {
  1: AddressZero,
  4: "0x9815370e9950fc0fbAc50A32F38edaD9cef06429",
  42: "0xBD8466aeaa5EA63DA9BCd143409Fc29d6a32dC41",
  137: "0x978E4a6B2D6FC7D3abb0f26c4A4DFaaEF132C4Af",
  // 80001: "0x32bA27718d351409353f9352E374Be412B2C597B", // alpha
  80001: "0x8605b7dcfec98fd218e8c561a52838af4d1d569d", // bravo
};

export const FIXED_INTEREST_RATE_MODEL_ADDRESSES = {
  1: AddressZero,
  4: "0xa1a54f34e210101B2663AEe505E020488DaED0D5",
  42: "0x18d70f45817F13C8a1cA5cAaf83DAA79CB9c1D81",
  137: "0x75B3B799a80d36EE3E85E0216062313f623D3515",
  80001: "0xF2C4aD00F716F451cf5D333201980Cba36b5dE77",
};

export const COMPOUND_ADAPTER_ADDRESSES = {
  1: AddressZero,
  4: "0x5522371babA983a6ECd1f04bA2077d5F97F73283",
  42: "0x8cF4F439F8DC8c5881FD1b7663eCbDfF6960265C",
  137: AddressZero,
  80001: AddressZero,
};

export const PURE_TOKEN_ADAPTER_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  42: "0xD6e9e104db88241C2d3Cd20a061bF6EbF7972dDa",
  137: "0x2F4076c06bB4b5933D8c9E45F2298C45e61139EB",
  80001: "0x9476234cb7c4DadFAe92F89Bdc1f9c1f00608332",
};

export const AAVE_ADAPTER_ADDRESSES = {
  1: AddressZero,
  4: AddressZero,
  42: AddressZero,
  137: "0x601b9399eccf091cD5EC4CdB58A835bfbCe19C4E",
  80001: "0xbBEc291424fB4ce2Dc0d95Bc3316Ec07CB4c2C7D",
};

export const SCALE = 10 ** 18;

export const BLOCK_SPEED = {
  1: 12,
  4: 12,
  42: 7,
  137: 2,
  80001: 2,
};

export const TOKENS = {
  1: {
    DAI: AddressZero,
    UNION: AddressZero,
  },
  4: {
    DAI: "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
    UNION: UNION_TOKEN_ADDRESSES[4],
  },
  42: {
    DAI: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    UNION: UNION_TOKEN_ADDRESSES[42],
  },
  137: {
    DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    UNION: UNION_TOKEN_ADDRESSES[137],
  },
  80001: {
    DAI: "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F",
    UNION: UNION_TOKEN_ADDRESSES[80001],
  },
};

export const REPAY_MARGIN = 1.000011;

export const MESSAGE = `Hello from the Union team. Please verify your email and wallet ownership by signing this message. This doesn't cost anything and your email won't be publicly visible.`;

export const OFAC_SANCTIONED = [
  /* Belarus */
  "BY",
  /* Code D'Ivoire */
  "CI",
  /* Cuba */
  "CU",
  /* Congo */
  "CD",
  /* Iran */
  "IR",
  /* Iraq */
  "IQ",
  /* Liberia */
  "LR",
  /* Myanmar (Burma) */
  "MM",
  /* North Korea */
  "KP",
  /* Sudan */
  "SD",
  /* South Sudan */
  "SS",
  /* Syria */
  "SY",
  /* Zimbabwe */
  "ZW",
];

export const GRAPHQL_URL = {
  137: "https://api.thegraph.com/subgraphs/name/unioncredit/union-",
};

export const GRAPHQL_URLS = {
  137: {
    user: "https://api.thegraph.com/subgraphs/name/unioncredit/union-user",
    gov: "https://api.thegraph.com/subgraphs/name/unioncredit/union-gov",
    rewards:
      "https://api.thegraph.com/subgraphs/name/unioncredit/union-rewards",
    utoken: "https://api.thegraph.com/subgraphs/name/unioncredit/union-utoken",
  },
  42: {
    user: "https://api.thegraph.com/subgraphs/name/geraldhost/union-user-kovan",
    gov: "https://api.thegraph.com/subgraphs/name/geraldhost/union-gov-kovan",
    rewards:
      "https://api.thegraph.com/subgraphs/name/geraldhost/union-rewards-kovan",
    utoken:
      "https://api.thegraph.com/subgraphs/name/geraldhost/union-utoken-kovan",
  },
};
