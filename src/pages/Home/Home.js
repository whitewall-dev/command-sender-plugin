import React from 'react';
import { useTranslation } from 'react-i18next';
import settings from '../../config';
import Header from './components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';

const PAGE_ICON = 'plugin';
const BLANK = '_blank';

const Home = () => {
    const { t } = useTranslation();


    return (
        <div className="ph1 ph4-m ph5-ns pb5">
            <Header
                title={t('title.homePage')}
                icon={PAGE_ICON}
                onClick={() => window.open(settings.repositoryUrl, BLANK)}
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
                                />
                            </div>
                            <div className="mt2">
                                <Input
                                    name="method"
                                    label="Method"
                                    placeholder="get"
                                />
                            </div>
                            <div className="mt2">
                                <Input
                                    name="uri"
                                    label="Uri"
                                    placeholder="/contacts"
                                />
                            </div>
                            <div className="mt2 flex justify-end">
                                <Button
                                    text="Send" />
                            </div>    
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

Home.propTypes = {};

export default Home;
