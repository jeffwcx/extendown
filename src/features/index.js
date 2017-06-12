/**
 * return a array contains all features of extendown
 */
import Head from './block/Head';
import SplitLine from './block/SplitLine';
import BlockCode from './block/BlockCode';
import Table from './block/Table';
import ItaticBold from './inline/ItaticBold';
import InlineCode from './inline/InlineCode';
import ImageLink from './inline/ImageLink';
import Strikethrough from './inline/Strikethrough';
import Emoji from './inline/Emoji';
import Br from './inline/Br';

const block = [];
const inline = [];

block.push(Head);
block.push(SplitLine);
block.push(BlockCode);
block.push(Table);

inline.push(ItaticBold);
inline.push(InlineCode);
inline.push(ImageLink);
inline.push(Strikethrough);
inline.push(Emoji);
inline.push(Br);

export { block, inline };

