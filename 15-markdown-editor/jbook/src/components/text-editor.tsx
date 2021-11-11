import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const [value, setValue] = useState<string | undefined>('**Hellow world!!!**');

  return (
    <div>
      <MDEditor value={value} onChange={setValue} />
    </div>
  );
};

export default TextEditor;
