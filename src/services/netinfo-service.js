import NetInfo from "@react-native-community/netinfo";

class NetInfoService {

    async isConnected() {
        const state = await NetInfo.fetch();
        return state.isConnected;
    }

}

export default new NetInfoService();