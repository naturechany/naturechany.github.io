import { Link } from 'react-router';
import { EmptyState } from '../components/primitives';

export function NotFoundPage() {
  return (
    <EmptyState title="페이지를 찾을 수 없습니다.">
      <p>
        주소가 바뀌었거나 삭제된 단원입니다.{' '}
        <Link to="/eras" className="font-medium text-primary hover:underline">
          시대별 학습으로 이동
        </Link>
      </p>
    </EmptyState>
  );
}