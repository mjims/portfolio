declare module 'react-quill-new' {
    import React from 'react';
    export interface ReactQuillProps {
        theme?: string;
        modules?: any;
        formats?: any[];
        value?: string;
        defaultValue?: string;
        placeholder?: string;
        readOnly?: boolean;
        onChange?: (content: string, delta: any, source: string, editor: any) => void;
        className?: string;
    }
    export default class ReactQuill extends React.Component<ReactQuillProps> { }
}
