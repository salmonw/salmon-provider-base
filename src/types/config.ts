interface INetwork {
  id: string,
  description: string;
}

interface INetworkConfigItem {
  networkId: string,
  nodeUrl: string,
}

export {
  INetwork,
  INetworkConfigItem,
};
