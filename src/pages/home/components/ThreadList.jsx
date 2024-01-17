import { useSelector } from 'react-redux';
import ThreadItem from './ThreadItem';

function ThreadList() {
    const { threads } = useSelector((state) => state?.allThreadReducer);

    const searchParams = new URLSearchParams(window.location.search);
    const categoryParams = searchParams.get('category') || '';

    const filteredThreads = categoryParams
        ? threads?.filter((thread) => thread?.category === categoryParams)
        : threads;

    return (
        <section className="py-6 px-8 flex flex-col gap-10 mb-6">
            {filteredThreads?.map((thread) => {
                const downVotes = thread.downVotesBy.length || 0;
                const upVotes = thread.upVotesBy.length || 0;
                return (
                    <ThreadItem
                        key={thread.id}
                        thread={thread}
                        downVotes={downVotes}
                        upVotes={upVotes}
                    />
                );
            })}
        </section>
    );
}

export default ThreadList;
