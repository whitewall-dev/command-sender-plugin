import React from 'react';
import { IframeMessageProxy } from 'iframe-message-proxy';
import Header from './components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';

const PAGE_ICON = 'plugin';
const BLANK = '_blank';

const Home = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [to, setTo] = React.useState('');
    const [method, setMethod] = React.useState('');
    const [uri, setUri] = React.useState('');
    const [type, setType] = React.useState('');
    const [resource, setResource] = React.useState('');
    const [response, setResponse] = React.useState();

    const executeCommand = async () => {
        const command = {
            to,
            method,
            type,
            resource,
            uri
        };

        setIsLoading(true);
        try {
            const message = await IframeMessageProxy.sendMessage({
                action: 'sendCommand',
                content: {
                    command
                }
            });

            setResponse(JSON.stringify(message.response, undefined, 2));
        } catch (error) {
            setResponse(JSON.stringify(JSON.parse(error), undefined, 2));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ph1 ph4-m ph5-ns pb5">
            <Header
                title="Command Sender"
                icon={PAGE_ICON}
                onClick={() => window.open("https://github.com/whitewall-dev/command-sender-plugin", BLANK)}
            />
            <div className="flex flex-column items-center justify-center bp-c-neutral-dark-city f5 h-100 mt4">
                <div className="w-50 mt3 mr2 center">
                    <Card>
                        <div className="flex flex-column g7-s">
                            <div>
                                <Input
                                    name="to"
                                    label="To"
                                    placeholder="postmaster@msging.net"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                />
                            </div>
                            <div className="mt2">
                                <Input
                                    name="method"
                                    label="Method"
                                    placeholder="get"
                                    value={method}
                                    onChange={(e) => setMethod(e.target.value)}
                                />
                            </div>
                            <div className="mt2">
                                <Input
                                    name="uri"
                                    label="Uri"
                                    placeholder="/contacts"
                                    value={uri}
                                    onChange={(e) => setUri(e.target.value)}
                                />
                            </div>
                            {method?.toLowerCase() === 'set' && (
                                <>
                                    <div className="mt2">
                                        <Input
                                            name="type"
                                            label="Type"
                                            placeholder="application/vnd.iris.contact+json"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                        />
                                    </div>
                                    <div className="mt2">
                                        <Input
                                            name="resource"
                                            label="Resource"
                                            placeholder='{"name": "John Doe"}'
                                            value={resource}
                                            onChange={(e) => setResource(e.target.value)}
                                            is_textarea
                                            textarea_rows={5}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="mt2 flex justify-end">
                                <Button
                                    disabled={isLoading || !to || !method || !uri}
                                    onClick={executeCommand}
                                    text="Send" />
                            </div>
                            {isLoading ? <div className="mt2">Executando comando...</div> : (
                                <pre>
                                    {response}
                                </pre>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

Home.propTypes = {};

export default Home;
