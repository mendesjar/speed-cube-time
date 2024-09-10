import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect } from "react";
import "./style.css";
import { RotateCw, X } from "lucide-react";

export function DialogShuffle({
  open,
  setOpen,
  pattern,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  pattern: string;
}) {
  var colors = ["blue", "green", "yellow", "white", "orange", "red"],
    faces: any = {
      F: 1,
      "F'": 1,
      U: 2,
      "U'": 2,
      D: 3,
      "D'": 3,
      R: 4,
      "R'": 4,
      L: 5,
      "L'": 5,
      B: 0,
      "B'": 0,
    },
    pieces: any = null;

  function close() {
    setOpen(false);
  }

  function getAxis(face: number) {
    return String.fromCharCode("X".charCodeAt(0) + face / 2); // X, Y or Z
  }

  function getPieceBy(face: number, index: number, corner: number) {
    return document.getElementById(
      "piece" +
        ((1 << face) +
          (1 << mx(face, index)) +
          (1 << mx(face, index + 1)) * corner)
    );
  }

  function mx(i: number, j: number) {
    return (
      ([2, 4, 3, 5][j % 4 | 0] +
        (i % 2) * (((j | 0) % 4) * 2 + 3) +
        2 * ((i / 2) | 0)) %
      6
    );
  }

  function animateRotation(face: number, cw: any, currentTime = Date.now()) {
    var k = 0.3 * ((face % 2) * 2 - 1) * (2 * cw - 1),
      qubes = Array(9)
        .fill(pieces[face])
        .map(function (value, index) {
          return index ? getPieceBy(face, index / 2, index % 2) : value;
        });
    (function rotatePieces() {
      var passed: number = Date.now() - currentTime,
        rotateAmount = k * passed * (passed < 300 ? 1 : 0),
        style = "rotate" + getAxis(face) + "(" + rotateAmount + "deg)";
      qubes.forEach(function (piece) {
        piece.style.transform = piece.style.transform.replace(
          /rotate.\(\S+\)/,
          style
        );
      });
      if (passed >= 300) return swapPieces(face, 3 - 2 * cw);
      requestAnimationFrame(rotatePieces);
    })();
  }

  function swapPieces(face: number, times: any) {
    for (var i = 0; i < 6 * times; i++) {
      var piece1 = getPieceBy(face, i / 2, i % 2),
        piece2 = getPieceBy(face, i / 2 + 1, i % 2);
      for (var j = 0; j < 5; j++) {
        if (piece1 && piece2) {
          var sticker1 = piece1.children[j < 4 ? mx(face, j) : face]
              .firstChild as HTMLElement,
            sticker2 = piece2.children[j < 4 ? mx(face, j + 1) : face]
              .firstChild as HTMLElement;
          var className = sticker1 ? sticker1.className : "";
          if (sticker1 && sticker2 && className) {
            (sticker1.className = sticker2.className),
              (sticker2.className = className);
          }
        }
      }
    }
  }

  function assembleCube() {
    function moveto(face: number) {
      id = id + (1 << face);
      pieces[i].children[face]
        .appendChild(document.createElement("div"))
        .setAttribute("class", "sticker " + colors[face]);
      return "translate" + getAxis(face) + "(" + ((face % 2) * 4 - 2) + "em)";
    }
    for (var id: number, x, i = 0; (id = 0), i < 26; i++) {
      x = mx(i, i % 18);
      pieces[i].style.transform =
        "rotateX(0deg)" +
        moveto(i % 6) +
        (i > 5 ? moveto(x) + (i > 17 ? moveto(mx(x, x + 2)) : "") : "");
      pieces[i].setAttribute("id", "piece" + id);
    }
  }

  function rotey(pattern: string) {
    const arrayFormat = Array.from(pattern.replace(/\s+/g, "")).reduce(
      (acc: any, char) => {
        if (char === "'") {
          acc[acc.length - 1] += char;
        } else if (char === "2") {
          acc.push(acc[acc.length - 1]);
        } else {
          acc.push(char);
        }
        return acc;
      },
      []
    );

    arrayFormat.forEach((face: string, i: number) => {
      setTimeout(() => {
        const faceRotation: boolean = face.includes("'") ? false : true;
        animateRotation(faces[face], faceRotation);
      }, (i + 1) * 2000);
    });
  }

  document.ondragstart = function () {
    return false;
  };

  useEffect(() => {
    if (open) {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        pieces = document.getElementsByClassName("piece");
        if (pieces) {
          assembleCube();
          rotey(pattern);
        }
      }, 1000);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-xl rounded-xl bg-gray-900/10 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex">
              <DialogTitle
                as="h3"
                className="text-base/7 font-extrabold text-gray-900"
              >
                Surffle
              </DialogTitle>
              <div className="select-none w-full flex items-center justify-end">
                <button
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
                  aria-label="Toggle navigation"
                  onClick={() => setOpen(false)}
                >
                  <X className="text-gray-900" />
                </button>
              </div>
            </div>
            <div className="relative h-[28rem]">
              <div className="scene w-full h-full" id="scene">
                <div
                  className="w-0 h-0 transition top-0 bottom-0 left-0 right-0 m-auto"
                  id="pivot"
                  style={{ transform: "rotateX(-35deg) rotateY(-135deg)" }}
                >
                  <div
                    className="cube -ml-6 -mt-6 text-3xl md:text-4xl"
                    id="cube"
                  >
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                    <div className="piece w-[3.8rem] h-[3.8rem] sm:w-[4.75rem] sm:h-[4.75rem]">
                      <div className="element w-full h-full bg-black rounded-xl left"></div>
                      <div className="element w-full h-full bg-black rounded-xl right"></div>
                      <div className="element w-full h-full bg-black rounded-xl top"></div>
                      <div className="element w-full h-full bg-black rounded-xl bottom"></div>
                      <div className="element w-full h-full bg-black rounded-xl back"></div>
                      <div className="element w-full h-full bg-black rounded-xl front"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="select-none tracking-widest text-gray-900 text-sm">
                {pattern}
              </p>
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
                aria-label="Toggle navigation"
                onClick={() => setOpen(false)}
              >
                <RotateCw className="text-gray-900" />
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
