
export interface Client {
    Name?: string;
    guid?: string;
    Adress?: string;
    Baud?: number;
    port?: number;
    connectionType?: ConnectionType;
    connectionState?: ConnectionState;
    ConnectionStateString?: string;
    ConnectionTypeString?: string;
    bindigs?: Binding[];
    Inputs?: Input[]; 
}

export interface Binding {
    Identfier:string;
    ValueName: string;
    Type: BindingType;
    Index: number;
    Input: boolean;
}
export interface Input {
    Key:string;
    Identfier: string;
    Type: number;
    
}

enum ConnectionType {

    SERIAL,
    TCP,
    UDP
}
enum ConnectionState {
    Disconnected,
    Connected,
    ConnectionError
}
enum BindingType {
    Bool,
    String,
    Int,
    MappedInt
}
