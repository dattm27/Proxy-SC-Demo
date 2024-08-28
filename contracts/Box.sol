pragma solidity ^0.8.20;
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
contract Box is  Initializable, AccessControlUpgradeable {
    uint256 public val;
    bytes32 public constant OPERATOR = keccak256("OPERATOR");
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize( uint256 initVal) public initializer {

        _grantRole(OPERATOR, msg.sender);
        val = initVal;
    }

    function inc() external onlyRole(OPERATOR) {
        val += 1;
    }

    function dec() external onlyRole(OPERATOR){
        val -= 1;
    }

    function reset() external onlyRole(OPERATOR){
        val = 0;
    }
}