package com.infosys.farmxchain.service;

import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
public class BlockchainService {

    // For free blockchain integration, we'll use SHA-256 hash simulation
    // In production, this would integrate with Ethereum Sepolia testnet using Web3j

    public String generateBlockchainHash(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating blockchain hash", e);
        }
    }

    public String registerCropOnBlockchain(Long cropId, String cropData) {
        // Simulate blockchain transaction
        // In real implementation, this would send transaction to smart contract
        String dataToHash = cropId + ":" + cropData + ":" + LocalDateTime.now().toString();
        String hash = generateBlockchainHash(dataToHash);

        // Generate a longer hash for transaction simulation
        String extendedData = dataToHash + ":" + System.nanoTime();
        String extendedHash = generateBlockchainHash(extendedData);

        // Simulate transaction hash (in real blockchain, this would be the tx hash)
        String simulatedTxHash = "0x" + (hash + extendedHash).substring(0, 64);

        return simulatedTxHash;
    }

    public boolean verifyBlockchainRecord(String hash, String data) {
        // Verify if the hash matches the data
        String computedHash = generateBlockchainHash(data);
        return computedHash.equals(hash);
    }
}
