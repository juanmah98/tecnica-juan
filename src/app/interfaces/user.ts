export interface Login {
    id: string;
    email: string;
}

export class Convert {
    public static toClave(json: string): Login {
        return JSON.parse(json);
    }

    public static claveToJson(value: Login): string {
        return JSON.stringify(value);
    }
}
