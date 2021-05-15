pragma solidity ^0.4.17;

contract Inbox{
    string public message;

    function Inbox(string msgs) public{
        message = msgs;
    }

    function setMessage(string msgs) public{
        message = msgs;
    }
}
