let Stalks = 50;
let HandPile;
let EastPile;
let WestPile;
let EastRemainder;
let WestRemainder;
let CountValue1;
let CountValue2;
let CountValue3;
let LineValue;
let asciipic;

const DivideStalks = function (YarrowStalks) {
  // Divide 49 stalks into eastpile westpile
  // Subtract one from westpile put in handpile

  WestPile = Math.floor(Math.random() * YarrowStalks + 1);
  EastPile = YarrowStalks - WestPile;
  WestPile = WestPile - 1;
  HandPile = 1;
};

const DivideEastAndWest = function () {
  EastRemainder = EastPile % 4;
  WestRemainder = WestPile % 4;
  if (EastRemainder === 0) EastRemainder = 4;
  if (WestRemainder === 0) WestRemainder = 4;
  HandPile = HandPile + EastRemainder + WestRemainder;
};
export const LineCast = function () {
  //This function creates the pictures of lines as broken or unbroken
  //and changing or unchanging
  try {
    Stalks = 49; //Remove one stalk and set it aside

    DivideStalks(Stalks);
    // Divide 49 Yarrow stalks into two piles at random: East and West
    // Subtract a single stalk from the West and put it in your hand
    // between thumb and pointer finger
    DivideEastAndWest();
    // Pick up stalks from the West pile in sets of 4 and set aside
    // until 4 or fewer stalks remain
    // Put those 4 or fewer stalks between your pointer and ring fingers
    // Now divide the West pile by 4 until 4 or fewer stalks remain
    // Remainder goes in hand again between ring and fourth finger
    // Now count the total remainder stalks in your hand
    // Remainder will always be 9 or 5 (1+x+x where x is 0-4)
    // If 9 stalks remain an arbitrary value of 2 was assigned to this step
    // If 5 stalks remain an arbitrary value of 3 was assigned.
    if (EastRemainder + WestRemainder + 1 === 9) CountValue1 = 2;
    if (EastRemainder + WestRemainder + 1 === 5) CountValue1 = 3;
    Stalks = Stalks - HandPile;
    // Remove stalks from you hand and set aside.
    DivideStalks(Stalks);
    // Now divide the pile of stalks before you into two piles again
    // And remove one from the West pile.
    DivideEastAndWest();
    // And sort each pile again by sets of four stalks
    // Until 4 or fewer remain, place those remainder stalks in your hand
    // As your stalks are now 49-9 = 40 or 49-5 = 44, minus
    // the 1 you always take from the westpile
    // the number you are dividing by 4 is either 39 or 43:
    // the remainder will now always be 8 or 4
    // 1+1+2=4
    // 1+2+1=4
    // 1+3+4=8
    // 1+4+3=8
    // (4 can only occur once, as neither 39 nor 43 are evenly divisible
    // by 4)
    // If 8 stalks are in your hand, the arbitrary counting value is assigned 2
    // If 4 stalks, the counting value is assigned 3
    if (EastRemainder + WestRemainder + 1 === 8) CountValue2 = 2;
    if (EastRemainder + WestRemainder + 1 === 4) CountValue2 = 3;
    Stalks = Stalks - HandPile;
    // For the third and final time for this line,
    // you set aside the 8 or 4 stalks in your HandPile
    DivideStalks(Stalks);
    // You now have 35, 31, or 39 stalks before you
    // Divide them into East and West piles for a third time
    DivideEastAndWest();
    // Remove one from the west pile again
    // and repeat the removal of 4 stalks from each pile
    // the possible outcomes are again 8 or 4
    // and the same arbitrary count value is assigned as
    // in the last step: an 8 means that value = 2 and a 4 means
    // it is assigned a 3.
    if (EastRemainder + WestRemainder + 1 === 8) CountValue3 = 2;
    if (EastRemainder + WestRemainder + 1 === 4) CountValue3 = 3;
    LineValue = CountValue1 + CountValue2 + CountValue3;
    // You now have 3 counting values of 2 or 3 which you
    // add together.
    // the results determine the nature of this single line:
    // If 7 Line = strong
    // If 8 Line = yielding
    // if 9 Line = strong but Changing
    // if 6 Line = yielding but Changing
    if (LineValue === 6) return DrawLine('weak', true);
    if (LineValue === 7) return DrawLine('strong', false);
    if (LineValue === 8) return DrawLine('weak', false);
    if (LineValue === 9) return DrawLine('strong', true);
  } catch (e) {
    console.log(e);
  }
}; // End LineCast Function

// notes from ashley: I came up with a plan to have 1 represent an unbroken and unchanging line, 0 to represent a broken and unchanging line, x to represent an unbroken line changing to broken (strong to weak), and o to represent a broken line changing to unbroken (weak to strong).

let DrawLine = function (line, changing) {
  if (changing && line === 'weak') {
    asciipic = '====&nbsp;o&nbsp;===';
    return 'o';
  }
  if (changing && line === 'strong') {
    asciipic = '====x====';
    return 'x';
  }
  if (!changing && line === 'strong') {
    asciipic = '=========';
    return '1';
  }
  if (!changing && line === 'weak') {
    asciipic = '===&nbsp;&nbsp;&nbsp;===';
    return '0';
  }
  return asciipic;
};
