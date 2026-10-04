import React, { useEffect } from 'react';
import { ArrowUpRight, Download, X, ExternalLink } from 'lucide-react';

export function PdfModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);
  if (!item) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className="media-modal pdf-modal" role="dialog" aria-modal="true" aria-label={`${item.title} report`}>
      <div className="modal-bar"><div><span className="eyebrow">DOCUMENT</span><h3>{item.title}</h3></div><button className="icon-btn" type="button" onClick={onClose} aria-label="Close"><X /></button></div>
      <iframe title={item.title} src={`${item.pdf}#view=FitH`} />
      <div className="modal-actions"><a className="button button-soft" href={item.pdf} target="_blank" rel="noreferrer"><ExternalLink size={16}/> Open</a><a className="button button-primary" href={item.pdf} download><Download size={16}/> Download</a></div>
    </div>
  </div>;
}

export function ImageModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);
  if (!item) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className="media-modal image-modal" role="dialog" aria-modal="true" aria-label={`${item.title} preview`}>
      <div className="modal-bar"><div><span className="eyebrow">EVIDENCE PREVIEW</span><h3>{item.title}</h3></div><button className="icon-btn" type="button" onClick={onClose} aria-label="Close"><X /></button></div>
      <div className="image-viewer"><img src={item.image} alt="" /></div>
      <div className="modal-actions"><a className="button button-soft" href={item.image} target="_blank" rel="noreferrer"><ArrowUpRight size={16}/> Full image</a><a className="button button-primary" href={item.pdf} target="_blank" rel="noreferrer">Open report <ExternalLink size={16}/></a></div>
    </div>
  </div>;
}
