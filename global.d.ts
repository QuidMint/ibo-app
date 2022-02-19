declare type Provider = import("./connectors/core/types").Provider;

interface Window {
    ethereum?: Provider
}