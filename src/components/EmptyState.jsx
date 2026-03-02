import Lottie from 'lottie-react';

const emptyStateAnimation = {
  v: '5.7.4',
  fr: 60,
  ip: 0,
  op: 120,
  w: 200,
  h: 200,
  nm: 'Empty',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Box',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [0], e: [10] }, { t: 60, s: [10], e: [0] }, { t: 120 }] },
        p: { a: 0, k: [100, 100, 0] },
        s: { a: 1, k: [{ t: 0, s: [100, 100], e: [105, 105] }, { t: 60, s: [105, 105], e: [100, 100] }, { t: 120 }] },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'rc',
              s: { a: 0, k: [80, 80] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 10 },
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.486, 0.227, 0.929, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 3 },
            },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] } },
          ],
        },
      ],
    },
  ],
};

const EmptyState = ({ message = 'No designs found' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Lottie animationData={emptyStateAnimation} loop style={{ width: 200, height: 200 }} />
      <p className="text-xl text-gray-400 mt-4">{message}</p>
    </div>
  );
};

export default EmptyState;
