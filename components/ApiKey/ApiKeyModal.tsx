import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';

interface ApiKeyProps {
    apiKey: string;
    onClose: () => void;
    onUpdateApiKey: (apiKey: string) => void;
  }

export const ApiKeyModal: FC<ApiKeyProps> = ({ apiKey, onClose, onUpdateApiKey }) => {
    const [updatedApiKey, setUpdatedApiKey] = useState<string>(apiKey);
    const apiKeyModalRef = useRef<HTMLDivElement>(null);
    const apiKeyInputRef = useRef<HTMLInputElement>(null);

    /**
     * Not handling ENTER pressed after submitting API key.
        const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            console.log('enter pressed');
            onUpdateApiKey({updatedApiKey});
            onClose();
            }
        }
     */
    
    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if(apiKeyModalRef.current && !(apiKeyModalRef.current.contains(e.target as Node))) {
                window.addEventListener('mouseup', handleMouseUp);
            }
        }
        const handleMouseUp = (e: MouseEvent) => {
            window.removeEventListener('mouseup', handleMouseUp);
            onClose();
        }

        window.addEventListener('mousedown', handleMouseDown);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
        }

    }, [onClose]);

    useEffect(() => {
        apiKeyInputRef.current?.focus();
    }, []);// we use when its mounted

 

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              />
    
              <div 
                ref={apiKeyModalRef}
                className="inline-block max-w-md w-full transform overflow-hidden rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-middle shadow-xl transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:p-6">
                <div className="text-lg font-bold mb-4 text-black">
                  {'Get started with your OpenAI API Key'}
                </div>
    
                <div className="mt-4">
                  <input
                    ref={apiKeyInputRef}
                    type="password"
                    className="border rounded-lg w-full px-3 py-2 text-black text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`sk-${'x'.repeat(48)}`}
                    value={updatedApiKey}
                    onChange={(e) => setUpdatedApiKey(e.target.value)}
                  />
                </div>
    
                <div className="mt-2 text-sm text-gray-500">
                  {'Your key is safe, its stored locally in your browser only.'}
                </div>
    
                <div className="mt-6">
                  <div className="text-sm text-gray-500">
                    {'Get your keys from here:'}
                  </div>
                  <a
                    href="https://platform.openai.com/account/api-keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    openai.com
                  </a>
                </div>
    
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full px-4 py-2 border rounded-lg shadow text-white bg-green-500 hover:bg-white hover:text-green-500 hover:border-green-500 focus:outline-none"
                    onClick={()=> {
                        onUpdateApiKey(updatedApiKey);
                        onClose();
                    }}
                  >
                    {'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
