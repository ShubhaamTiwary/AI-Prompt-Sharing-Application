import Nav from '@components/Nav';
import '@styles/globals.css'
import Provider from '@components/Provider';
import { Suspense } from 'react';

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share AI Prompts'
}

const RootLayout = ({ children }) => {
    return (
        <html lang='eng'>
            <body>
                <Provider >
                    <div className='main'>
                        <div className='gradient'>
                        </div>
                    </div>
                    <main className='app'>
                        <Nav />
                        <Suspense>
                        {children}
                        </Suspense>
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout;