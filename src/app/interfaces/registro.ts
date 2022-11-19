export interface Registro {
    id: string;
    email: string;
    password:string;
    name: string;    
}

export class Convert {
    public static toClave(json: string): Registro {
        return JSON.parse(json);
    }

    public static claveToJson(value: Registro): string {
        return JSON.stringify(value);
    }
}
