import { HashRouter, Route, Routes } from 'react-router';
import { Toaster } from 'sonner';
import { Layout } from './components/layout';
import { StudyProvider } from './store/study-provider';
import { HomePage } from './pages/home-page';
import { ErasPage } from './pages/eras-page';
import { EraDetailPage } from './pages/era-detail-page';
import { TopicPage } from './pages/topic-page';
import { KeywordsPage } from './pages/keywords-page';
import { MyPage } from './pages/my-page';
import { PracticePage } from './pages/practice-page';
import { QuizPage } from './pages/quiz-page';
import { NotFoundPage } from './pages/not-found-page';

// GitHub Pages는 SPA rewrite가 없으므로 HashRouter로 딥링크/새로고침 404 회피
export function HanneungApp() {
  return (
    <StudyProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="eras" element={<ErasPage />} />
            <Route path="eras/:eraId" element={<EraDetailPage />} />
            <Route path="topics/:topicId" element={<TopicPage />} />
            <Route path="keywords" element={<KeywordsPage />} />
            <Route path="practice" element={<PracticePage />} />
            <Route path="practice/:setId" element={<QuizPage />} />
            <Route path="my" element={<MyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
      <Toaster position="top-center" richColors />
    </StudyProvider>
  );
}