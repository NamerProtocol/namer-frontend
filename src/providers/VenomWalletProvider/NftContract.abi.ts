export const nftContractABI = {
    'ABI version': 2,
    version: '2.2',
    header: ['pubkey', 'time', 'expire'],
    functions: [
        {
            name: 'constructor',
            inputs: [
                { name: 'codeNft', type: 'cell' },
                { name: 'json', type: 'string' },
                { name: 'codeIndex', type: 'cell' },
                { name: 'codeIndexBasis', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'mintNft',
            inputs: [{ name: 'json', type: 'string' }],
            outputs: [],
        },
        {
            name: 'indexBasisCode',
            inputs: [{ name: 'answerId', type: 'uint32' }],
            outputs: [{ name: 'code', type: 'cell' }],
        },
        {
            name: 'indexBasisCodeHash',
            inputs: [{ name: 'answerId', type: 'uint32' }],
            outputs: [{ name: 'hash', type: 'uint256' }],
        },
        {
            name: 'resolveIndexBasis',
            inputs: [{ name: 'answerId', type: 'uint32' }],
            outputs: [{ name: 'indexBasis', type: 'address' }],
        },
        {
            name: 'indexCode',
            inputs: [{ name: 'answerId', type: 'uint32' }],
            outputs: [{ name: 'code', type: 'cell' }],
        },
        {
            name: 'indexCodeHash',
            inputs: [{ name: 'answerId', type: 'uint32' }],
            outputs: [{ name: 'hash', type: 'uint256' }],
        },
        {
            name: 'getJson',
            inputs: [{ name: 'answerId', type: 'uint32' }],
            outputs: [{ name: 'json', type: 'string' }],
        },
        {
            name: 'totalSupply',
            inputs: [{ name: 'answerId', type: 'uint32' }],
            outputs: [{ name: 'count', type: 'uint128' }],
        },
        {
            name: 'nftCode',
            inputs: [{ name: 'answerId', type: 'uint32' }],
            outputs: [{ name: 'code', type: 'cell' }],
        },
        {
            name: 'nftCodeHash',
            inputs: [{ name: 'answerId', type: 'uint32' }],
            outputs: [{ name: 'codeHash', type: 'uint256' }],
        },
        {
            name: 'nftAddress',
            inputs: [
                { name: 'answerId', type: 'uint32' },
                { name: 'id', type: 'uint256' },
            ],
            outputs: [{ name: 'nft', type: 'address' }],
        },
        {
            name: 'supportsInterface',
            inputs: [
                { name: 'answerId', type: 'uint32' },
                { name: 'interfaceID', type: 'uint32' },
            ],
            outputs: [{ name: 'value0', type: 'bool' }],
        },
    ],
    data: [],
    events: [
        {
            name: 'NftCreated',
            inputs: [
                { name: 'id', type: 'uint256' },
                { name: 'nft', type: 'address' },
                { name: 'owner', type: 'address' },
                { name: 'manager', type: 'address' },
                { name: 'creator', type: 'address' },
            ],
            outputs: [],
        },
        {
            name: 'NftBurned',
            inputs: [
                { name: 'id', type: 'uint256' },
                { name: 'nft', type: 'address' },
                { name: 'owner', type: 'address' },
                { name: 'manager', type: 'address' },
            ],
            outputs: [],
        },
    ],
    fields: [
        { name: '_pubkey', type: 'uint256' },
        { name: '_timestamp', type: 'uint64' },
        { name: '_constructorFlag', type: 'bool' },
        { name: '_supportedInterfaces', type: 'optional(cell)' },
        { name: '_codeNft', type: 'cell' },
        { name: '_totalSupply', type: 'uint128' },
        { name: '_json', type: 'string' },
        { name: '_codeIndex', type: 'cell' },
        { name: '_codeIndexBasis', type: 'cell' },
        { name: '_indexDeployValue', type: 'uint128' },
        { name: '_indexDestroyValue', type: 'uint128' },
        { name: '_deployIndexBasisValue', type: 'uint128' },
        { name: '_nonce', type: 'uint8' },
        { name: '_remainOnNft', type: 'uint128' },
    ],
};
