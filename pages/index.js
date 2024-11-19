import React from 'react';
import dynamic from 'next/dynamic';

// 使用动态导入避免 SSR 问题
const GeneralDescription = dynamic(() => import('../components/GeneralDescription'), {
  ssr: false
});
const SchoolComparison = dynamic(() => import('../components/SchoolComparison'), {
  ssr: false
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">TKT Test Results Analysis</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">General Description</h2>
            <GeneralDescription />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">School Comparison</h2>
            <SchoolComparison />
          </section>
        </div>
      </main>
    </div>
  );
}