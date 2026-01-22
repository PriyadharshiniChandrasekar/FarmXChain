// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CropRegistry {
    struct CropRecord {
        uint256 cropId;
        string dataHash;
        uint256 timestamp;
        address registeredBy;
    }

    mapping(uint256 => CropRecord) public crops;
    uint256[] public cropIds;

    event CropRegistered(uint256 indexed cropId, string dataHash, uint256 timestamp, address registeredBy);

    function registerCrop(uint256 _cropId, string memory _dataHash) public {
        crops[_cropId] = CropRecord({
            cropId: _cropId,
            dataHash: _dataHash,
            timestamp: block.timestamp,
            registeredBy: msg.sender
        });
        cropIds.push(_cropId);
        emit CropRegistered(_cropId, _dataHash, block.timestamp, msg.sender);
    }

    function getCrop(uint256 _cropId) public view returns (uint256, string memory, uint256, address) {
        CropRecord memory crop = crops[_cropId];
        return (crop.cropId, crop.dataHash, crop.timestamp, crop.registeredBy);
    }

    function isRegistered(uint256 _cropId) public view returns (bool) {
        return crops[_cropId].timestamp != 0;
    }
}
