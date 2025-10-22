import React from 'react';

// Muted colors (red -> green)
const RATING_COLORS = ['#C85A54', '#D98C4C', '#D7B85B', '#A7BF5F', '#6BA96B'];

export interface ReviewScoreProps {
    score: number;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

/**
 * ReviewScore (Bootstrap version)
 * Renders 5 rectangular cells horizontally. Each cell is filled proportionally
 * depending on the score (so 3.5 means three full cells and the 4th cell 50% filled).
 * The color for all cells is determined by the overall score.
 */
export const ReviewScore: React.FC<ReviewScoreProps> = ({ score, size = 'md', className = '' }) => {
    const clamped = Math.max(0, Math.min(5, Number(score) || 0));
    const sizes: Record<string, string> = {
        sm: '10px',
        md: '20px',
        lg: '30px',
    };
    const height = sizes[size] || sizes.md;

    // Determine the overall color based on score (rounded down)
    const colorIndex = Math.min(4, Math.max(0, Math.floor(clamped - 0.001)));
    const fillColor = RATING_COLORS[colorIndex];

    const cells = Array.from({ length: 5 }, (_, i) => {
        const raw = clamped - i;
        const filled = Math.max(0, Math.min(1, raw));
        return { filled };
    });

    return (
        <div
            className={`d-inline-flex align-items-center gap-1 ${className}`}
            role="img"
            aria-label={`Rating: ${clamped} out of 5`}
            title={`${clamped} / 5`}
        >
            {cells.map(({ filled }, idx) => (
                <div
                    key={idx}
                    className="position-relative flex-fill border border-secondary overflow-hidden"
                    style={{ height, minWidth: '36px', backgroundColor: '#f8f9fa' }}
                    aria-hidden="false"
                    title={`${(filled * 100).toFixed(0)}% of cell ${idx + 1}`}
                >
                    {/* Filled overlay */}
                    <div
                        className="position-absolute top-0 start-0 h-100"
                        style={{
                            width: `${filled * 100}%`,
                            backgroundColor: fillColor,
                            transition: 'width 240ms ease',
                        }}
                    />
                </div>
            ))}
            <span className="score">{score}/5</span>
        </div>
    );
};
