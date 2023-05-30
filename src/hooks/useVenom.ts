import { VenomWalletContext } from "providers/VenomWalletProvider/VenomWalletProvider.constants";
import { useContext } from "react";

export const useVenom = () => useContext(VenomWalletContext)